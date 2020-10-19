import {schema} from "normalizr";

// const deliveryMethod = new schema.Entity("deliveryMethods");
// const paymentMethod = new schema.Entity("paymentMethods");

const contactMethod = new schema.Entity("contactMethods");
const country = new schema.Entity("countries");
const city = new schema.Entity("cities");
const users = new schema.Entity("owners");

export const myDeliveriesSchema = new schema.Entity(
    "deliveryItems",
    {
        // payment_method: paymentMethod,
        origin_country: country,
        destination_country: country,
        origin_city: city,
        destination_city: city,
        owner: users,
        // delivery_method: deliveryMethod,
        contact_methods: [contactMethod],
    },
    {idAttribute: "slug"}
);
