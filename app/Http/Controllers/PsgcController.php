<?php

namespace App\Http\Controllers;

use App\Services\PsgcClient;
use Closure;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\JsonResponse;

class PsgcController extends Controller
{
    public function regions(PsgcClient $psgc): JsonResponse
    {
        return $this->respond(fn (): array => $psgc->regions());
    }

    public function provinces(string $regionCode, PsgcClient $psgc): JsonResponse
    {
        return $this->respond(fn (): array => $psgc->provinces($regionCode));
    }

    public function citiesMunicipalities(string $provinceCode, PsgcClient $psgc): JsonResponse
    {
        return $this->respond(fn (): array => $psgc->citiesMunicipalities($provinceCode));
    }

    public function barangays(string $cityMunicipalityCode, PsgcClient $psgc): JsonResponse
    {
        return $this->respond(fn (): array => $psgc->barangays($cityMunicipalityCode));
    }

    /** @param Closure(): array<int, array<string, mixed>> $request */
    private function respond(Closure $request): JsonResponse
    {
        try {
            return response()->json($request());
        } catch (ConnectionException|RequestException $exception) {
            report($exception);

            return response()->json([
                'message' => 'The PSGC service is temporarily unavailable.',
            ], 503);
        }
    }
}
