<?php

namespace App\Http\Controllers;

use OpenApi\Attributes as OA;

#[OA\Info(
    title: "UpWearLane API Documentation",
    version: "1.0.0",
    description: "API documentation for UpWearLane - Premium Fashion & Apparel",
    contact: new OA\Contact(email: "admin@upwearlane.com")
)]
#[OA\Server(url: "http://localhost:8000", description: "Local Server")]
abstract class Controller
{
    //
}
