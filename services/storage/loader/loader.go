package loader

import (
	"storage/config"
	"storage/storage"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/requestid"
)

func LoadApi(app *fiber.App) {
	// Middlewares
	app.Use(cors.New())
	app.Use(requestid.New())
	app.Use(logger.New())
	app.Use(limiter.New(limiter.Config{
		Max:        25,
		Expiration: 30 * time.Second,
	}))

	router := app.Group(config.GetRootPath())

	// Controller
	storageRouter := router.Group("/")
	storage.Controller().Load(storageRouter)
}
