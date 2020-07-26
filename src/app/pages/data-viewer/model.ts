// classes to extract relevant attributes from API request

export class Country {

    updated: string;
    country: string
    countryInfo: CountryInfo;
    cases: number;
    todayCases: number;
    deaths: number;
    todayDeaths: number;
    recovered: number;
    todayRecovered: number;
    active: number;
    critical: number;
    casesPerOneMillion: number;
    deathsPerOneMillion: number;
    tests: number;
    testsPerOneMillion: number;
}

export class Global {

    updated: number;
    cases: number;
    todayCases: number;
    deaths: number;
    todayDeaths: number;
    recovered: number;
    todayRecovered: number;
    active: number;
    critical: number;
    affectedCountries: number;
    tests: number;
}

export class History {
    cases: Object;
    deaths: Object;
    recovered: Object;
}

export class CountryHistory {
    country: string;
    timeline: History;
}

export class CountryInfo {
    flag: string;
}