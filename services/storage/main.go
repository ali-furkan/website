package main

import (
	"storage/config"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello World")
	})

	PORT := config.GetEnvVariable("PORT")

	app.Listen(":" + PORT)
}
