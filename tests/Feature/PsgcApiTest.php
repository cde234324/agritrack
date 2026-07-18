<?php

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

beforeEach(function () {
    Cache::flush();
    Http::preventStrayRequests();
});

test('PSGC locations are loaded through the application endpoints', function () {
    Http::fake([
        'https://psgc.gitlab.io/api/regions/' => Http::response([
            ['code' => '010000000', 'name' => 'Ilocos Region', 'regionName' => 'Region I'],
        ]),
        'https://psgc.gitlab.io/api/regions/010000000/provinces/' => Http::response([
            ['code' => '012800000', 'name' => 'Ilocos Norte'],
        ]),
        'https://psgc.gitlab.io/api/provinces/012800000/cities-municipalities/' => Http::response([
            ['code' => '012801000', 'name' => 'Adams', 'isCity' => false, 'isMunicipality' => true],
        ]),
        'https://psgc.gitlab.io/api/cities-municipalities/012801000/barangays/' => Http::response([
            ['code' => '012801001', 'name' => 'Adams (Pob.)'],
        ]),
    ]);

    $this->getJson(route('psgc.regions'))
        ->assertSuccessful()
        ->assertJsonPath('0.regionName', 'Region I');

    $this->getJson(route('psgc.regions'))->assertSuccessful();

    $this->getJson(route('psgc.provinces', ['regionCode' => '010000000']))
        ->assertSuccessful()
        ->assertJsonPath('0.name', 'Ilocos Norte');

    $this->getJson(route('psgc.cities-municipalities', ['provinceCode' => '012800000']))
        ->assertSuccessful()
        ->assertJsonPath('0.name', 'Adams');

    $this->getJson(route('psgc.barangays', ['cityMunicipalityCode' => '012801000']))
        ->assertSuccessful()
        ->assertJsonPath('0.name', 'Adams (Pob.)');

    Http::assertSentCount(4);
});

test('PSGC endpoints reject malformed geographic codes', function () {
    $this->getJson('/api/psgc/regions/not-a-code/provinces')->assertNotFound();
});

test('PSGC connection failures return a service unavailable response', function () {
    Http::fake([
        'https://psgc.gitlab.io/api/regions/' => Http::failedConnection(),
    ]);

    $this->getJson(route('psgc.regions'))
        ->assertServiceUnavailable()
        ->assertJsonPath('message', 'The PSGC service is temporarily unavailable.');
});
