<?php

namespace App\Services;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

final class PsgcClient
{
    /** @return array<int, array<string, mixed>> */
    public function regions(): array
    {
        return $this->get('regions/');
    }

    /** @return array<int, array<string, mixed>> */
    public function provinces(string $regionCode): array
    {
        return $this->get("regions/{$regionCode}/provinces/");
    }

    /** @return array<int, array<string, mixed>> */
    public function citiesMunicipalities(string $provinceCode): array
    {
        return $this->get("provinces/{$provinceCode}/cities-municipalities/");
    }

    /** @return array<int, array<string, mixed>> */
    public function barangays(string $cityMunicipalityCode): array
    {
        return $this->get("cities-municipalities/{$cityMunicipalityCode}/barangays/");
    }

    /** @return array<int, array<string, mixed>> */
    private function get(string $path): array
    {
        return Cache::remember(
            'psgc:'.md5($path),
            now()->addDay(),
            function () use ($path): array {
                $response = Http::baseUrl((string) config('services.psgc.base_url'))
                    ->acceptJson()
                    ->connectTimeout(3)
                    ->timeout(10)
                    ->retry([200, 500])
                    ->get($path)
                    ->throw();

                $locations = $response->json();

                if (! is_array($locations)) {
                    return [];
                }

                return collect($locations)
                    ->filter(fn (mixed $location): bool => is_array($location)
                        && is_string($location['code'] ?? null)
                        && is_string($location['name'] ?? null))
                    ->map(fn (array $location): array => Arr::only($location, [
                        'code',
                        'name',
                        'regionName',
                        'isCity',
                        'isMunicipality',
                    ]))
                    ->values()
                    ->all();
            },
        );
    }
}
