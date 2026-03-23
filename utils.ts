import { CarRentalResponse } from "./interface";

export function getCarRentalName(carRental: string | CarRentalResponse | undefined) {
    if (!carRental) return "Unknown"
    return typeof carRental === "string"
        ? carRental
        : carRental.name;
}

export function formatDate(date: Date | string) {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString();
}