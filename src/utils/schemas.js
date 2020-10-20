import {schema} from "normalizr";

const contactMethod = new schema.Entity("contactMethods");
const city = new schema.Entity("cities");

export const myDeliveriesSchema = new schema.Entity(
    "deliveryItems",
    {
        // payment_method: paymentMethod,
        origin: city,
        destination: city,
        contact_methods: [contactMethod],
    },
    {idAttribute: "slug"}
);
