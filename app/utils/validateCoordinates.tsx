export default function handleCoordsValidation(
    pickUpLat: number | undefined,
    pickUpLng: number | undefined,
    dropOffLat: number | undefined,
    dropOffLng: number | undefined

) {
    if (
        pickUpLat !== undefined &&
        pickUpLng !== undefined &&
        dropOffLat !== undefined &&
        dropOffLng !== undefined
    ) {
        return {
            pickUp: { lat: pickUpLat, lng: pickUpLng },
            dropOff: { lat: dropOffLat, lng: dropOffLng },
        };
    } else {
        throw new Error("Pickup or Dropoff coordinates are not set.");

    }
}
