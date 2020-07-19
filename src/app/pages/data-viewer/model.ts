export class Country {

    country: string
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
    cases: number;
    deaths: number;
    recovered: number;
}

export class Day {

    Country: string;
    Confirmed: number;
    Recovered: number;
    Deaths: number;
    Date: string;
}