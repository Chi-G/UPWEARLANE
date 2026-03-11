<?php

namespace App\Http\Virtual;

use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: "Product",
    type: "object",
    title: "Product",
    properties: [
        new OA\Property(property: "id", type: "string"),
        new OA\Property(property: "name", type: "string"),
        new OA\Property(property: "description", type: "string"),
        new OA\Property(property: "price", type: "number", format: "float"),
        new OA\Property(property: "image", type: "string"),
        new OA\Property(property: "category", type: "string")
    ]
)]
#[OA\Schema(
    schema: "Category",
    type: "object",
    title: "Category",
    properties: [
        new OA\Property(property: "id", type: "integer"),
        new OA\Property(property: "name", type: "string"),
        new OA\Property(property: "slug", type: "string"),
        new OA\Property(property: "icon", type: "string")
    ]
)]
#[OA\Schema(
    schema: "Review",
    type: "object",
    title: "Review",
    properties: [
        new OA\Property(property: "id", type: "integer"),
        new OA\Property(property: "user", type: "string"),
        new OA\Property(property: "rating", type: "integer"),
        new OA\Property(property: "comment", type: "string"),
        new OA\Property(property: "created_at", type: "string", format: "date-time")
    ]
)]
#[OA\Schema(
    schema: "OrderSchema",
    type: "object",
    title: "Order",
    properties: [
        new OA\Property(property: "id", type: "integer"),
        new OA\Property(property: "order_number", type: "string"),
        new OA\Property(property: "status", type: "string"),
        new OA\Property(property: "total", type: "number", format: "float"),
        new OA\Property(property: "currency", type: "string")
    ]
)]
#[OA\Schema(
    schema: "PaymentIntentRequest",
    type: "object",
    title: "Payment Intent Request",
    required: ["items", "shipping_address", "shipping_method", "currency", "subtotal", "shipping_cost", "total"],
    properties: [
        new OA\Property(property: "items", type: "array", items: new OA\Items(type: "object")),
        new OA\Property(property: "shipping_address", type: "object"),
        new OA\Property(property: "shipping_method", type: "object"),
        new OA\Property(property: "currency", type: "string", enum: ["USD", "NGN", "GBP", "CAD"]),
        new OA\Property(property: "subtotal", type: "number", format: "float"),
        new OA\Property(property: "shipping_cost", type: "number", format: "float"),
        new OA\Property(property: "tax", type: "number", format: "float"),
        new OA\Property(property: "total", type: "number", format: "float")
    ]
)]
class SwaggerSchemas
{
}
