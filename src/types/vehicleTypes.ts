export interface Vehicle {
    _id: string;
    manufacturer: string;
    model: string;
    year: number;
    price: number;
    desc: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface VehiclePaginatedResponse {
    data: Vehicle[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
}


