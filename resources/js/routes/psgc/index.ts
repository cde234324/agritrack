import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PsgcController::regions
 * @see app/Http/Controllers/PsgcController.php:13
 * @route '/api/psgc/regions'
 */
export const regions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: regions.url(options),
    method: 'get',
})

regions.definition = {
    methods: ["get","head"],
    url: '/api/psgc/regions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PsgcController::regions
 * @see app/Http/Controllers/PsgcController.php:13
 * @route '/api/psgc/regions'
 */
regions.url = (options?: RouteQueryOptions) => {
    return regions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsgcController::regions
 * @see app/Http/Controllers/PsgcController.php:13
 * @route '/api/psgc/regions'
 */
regions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: regions.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PsgcController::regions
 * @see app/Http/Controllers/PsgcController.php:13
 * @route '/api/psgc/regions'
 */
regions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: regions.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PsgcController::regions
 * @see app/Http/Controllers/PsgcController.php:13
 * @route '/api/psgc/regions'
 */
    const regionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: regions.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PsgcController::regions
 * @see app/Http/Controllers/PsgcController.php:13
 * @route '/api/psgc/regions'
 */
        regionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: regions.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PsgcController::regions
 * @see app/Http/Controllers/PsgcController.php:13
 * @route '/api/psgc/regions'
 */
        regionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: regions.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    regions.form = regionsForm
/**
* @see \App\Http\Controllers\PsgcController::provinces
 * @see app/Http/Controllers/PsgcController.php:18
 * @route '/api/psgc/regions/{regionCode}/provinces'
 */
export const provinces = (args: { regionCode: string | number } | [regionCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: provinces.url(args, options),
    method: 'get',
})

provinces.definition = {
    methods: ["get","head"],
    url: '/api/psgc/regions/{regionCode}/provinces',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PsgcController::provinces
 * @see app/Http/Controllers/PsgcController.php:18
 * @route '/api/psgc/regions/{regionCode}/provinces'
 */
provinces.url = (args: { regionCode: string | number } | [regionCode: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { regionCode: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    regionCode: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        regionCode: args.regionCode,
                }

    return provinces.definition.url
            .replace('{regionCode}', parsedArgs.regionCode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsgcController::provinces
 * @see app/Http/Controllers/PsgcController.php:18
 * @route '/api/psgc/regions/{regionCode}/provinces'
 */
provinces.get = (args: { regionCode: string | number } | [regionCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: provinces.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PsgcController::provinces
 * @see app/Http/Controllers/PsgcController.php:18
 * @route '/api/psgc/regions/{regionCode}/provinces'
 */
provinces.head = (args: { regionCode: string | number } | [regionCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: provinces.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PsgcController::provinces
 * @see app/Http/Controllers/PsgcController.php:18
 * @route '/api/psgc/regions/{regionCode}/provinces'
 */
    const provincesForm = (args: { regionCode: string | number } | [regionCode: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: provinces.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PsgcController::provinces
 * @see app/Http/Controllers/PsgcController.php:18
 * @route '/api/psgc/regions/{regionCode}/provinces'
 */
        provincesForm.get = (args: { regionCode: string | number } | [regionCode: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: provinces.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PsgcController::provinces
 * @see app/Http/Controllers/PsgcController.php:18
 * @route '/api/psgc/regions/{regionCode}/provinces'
 */
        provincesForm.head = (args: { regionCode: string | number } | [regionCode: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: provinces.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    provinces.form = provincesForm
/**
* @see \App\Http\Controllers\PsgcController::citiesMunicipalities
 * @see app/Http/Controllers/PsgcController.php:23
 * @route '/api/psgc/provinces/{provinceCode}/cities-municipalities'
 */
export const citiesMunicipalities = (args: { provinceCode: string | number } | [provinceCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: citiesMunicipalities.url(args, options),
    method: 'get',
})

citiesMunicipalities.definition = {
    methods: ["get","head"],
    url: '/api/psgc/provinces/{provinceCode}/cities-municipalities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PsgcController::citiesMunicipalities
 * @see app/Http/Controllers/PsgcController.php:23
 * @route '/api/psgc/provinces/{provinceCode}/cities-municipalities'
 */
citiesMunicipalities.url = (args: { provinceCode: string | number } | [provinceCode: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { provinceCode: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    provinceCode: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        provinceCode: args.provinceCode,
                }

    return citiesMunicipalities.definition.url
            .replace('{provinceCode}', parsedArgs.provinceCode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsgcController::citiesMunicipalities
 * @see app/Http/Controllers/PsgcController.php:23
 * @route '/api/psgc/provinces/{provinceCode}/cities-municipalities'
 */
citiesMunicipalities.get = (args: { provinceCode: string | number } | [provinceCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: citiesMunicipalities.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PsgcController::citiesMunicipalities
 * @see app/Http/Controllers/PsgcController.php:23
 * @route '/api/psgc/provinces/{provinceCode}/cities-municipalities'
 */
citiesMunicipalities.head = (args: { provinceCode: string | number } | [provinceCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: citiesMunicipalities.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PsgcController::citiesMunicipalities
 * @see app/Http/Controllers/PsgcController.php:23
 * @route '/api/psgc/provinces/{provinceCode}/cities-municipalities'
 */
    const citiesMunicipalitiesForm = (args: { provinceCode: string | number } | [provinceCode: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: citiesMunicipalities.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PsgcController::citiesMunicipalities
 * @see app/Http/Controllers/PsgcController.php:23
 * @route '/api/psgc/provinces/{provinceCode}/cities-municipalities'
 */
        citiesMunicipalitiesForm.get = (args: { provinceCode: string | number } | [provinceCode: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: citiesMunicipalities.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PsgcController::citiesMunicipalities
 * @see app/Http/Controllers/PsgcController.php:23
 * @route '/api/psgc/provinces/{provinceCode}/cities-municipalities'
 */
        citiesMunicipalitiesForm.head = (args: { provinceCode: string | number } | [provinceCode: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: citiesMunicipalities.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    citiesMunicipalities.form = citiesMunicipalitiesForm
/**
* @see \App\Http\Controllers\PsgcController::barangays
 * @see app/Http/Controllers/PsgcController.php:28
 * @route '/api/psgc/cities-municipalities/{cityMunicipalityCode}/barangays'
 */
export const barangays = (args: { cityMunicipalityCode: string | number } | [cityMunicipalityCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: barangays.url(args, options),
    method: 'get',
})

barangays.definition = {
    methods: ["get","head"],
    url: '/api/psgc/cities-municipalities/{cityMunicipalityCode}/barangays',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PsgcController::barangays
 * @see app/Http/Controllers/PsgcController.php:28
 * @route '/api/psgc/cities-municipalities/{cityMunicipalityCode}/barangays'
 */
barangays.url = (args: { cityMunicipalityCode: string | number } | [cityMunicipalityCode: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cityMunicipalityCode: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    cityMunicipalityCode: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        cityMunicipalityCode: args.cityMunicipalityCode,
                }

    return barangays.definition.url
            .replace('{cityMunicipalityCode}', parsedArgs.cityMunicipalityCode.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PsgcController::barangays
 * @see app/Http/Controllers/PsgcController.php:28
 * @route '/api/psgc/cities-municipalities/{cityMunicipalityCode}/barangays'
 */
barangays.get = (args: { cityMunicipalityCode: string | number } | [cityMunicipalityCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: barangays.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PsgcController::barangays
 * @see app/Http/Controllers/PsgcController.php:28
 * @route '/api/psgc/cities-municipalities/{cityMunicipalityCode}/barangays'
 */
barangays.head = (args: { cityMunicipalityCode: string | number } | [cityMunicipalityCode: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: barangays.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PsgcController::barangays
 * @see app/Http/Controllers/PsgcController.php:28
 * @route '/api/psgc/cities-municipalities/{cityMunicipalityCode}/barangays'
 */
    const barangaysForm = (args: { cityMunicipalityCode: string | number } | [cityMunicipalityCode: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: barangays.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PsgcController::barangays
 * @see app/Http/Controllers/PsgcController.php:28
 * @route '/api/psgc/cities-municipalities/{cityMunicipalityCode}/barangays'
 */
        barangaysForm.get = (args: { cityMunicipalityCode: string | number } | [cityMunicipalityCode: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: barangays.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PsgcController::barangays
 * @see app/Http/Controllers/PsgcController.php:28
 * @route '/api/psgc/cities-municipalities/{cityMunicipalityCode}/barangays'
 */
        barangaysForm.head = (args: { cityMunicipalityCode: string | number } | [cityMunicipalityCode: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: barangays.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    barangays.form = barangaysForm
const psgc = {
    regions: Object.assign(regions, regions),
provinces: Object.assign(provinces, provinces),
citiesMunicipalities: Object.assign(citiesMunicipalities, citiesMunicipalities),
barangays: Object.assign(barangays, barangays),
}

export default psgc