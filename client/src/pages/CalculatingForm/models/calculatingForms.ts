
export type TruckFormT = {
    name_of_first_driver: string,
    name_of_second_driver: string,
    year: number,
    make: string,
    unit: string,
    vin: string,
    license_plate_number: number,
    license_plate_issue_state: string,
    apportioned_with_oregon: string,
    registered_weight: string,
    axels: number,
    purchased_by_company: string,
    your_commodity: string,
    usdot_id: string,
    purchased: string;
}

export type RouteFormT = {
    usdot_id: number,
    service_type: string,
    entrance_point: string,
    trip_type: string,
    route_type: string,
    exit_point: string,
    stops:
    {
        city_or_zip: string,
        service_type: string
    }[]

}