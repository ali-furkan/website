package main

import (
	"storage/config"
	"storage/loader"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	loader.LoadApi(app)

	PORT := config.GetEnvVariable("PORT")

	app.Listen(":" + PORT)
}
