package storage

import (
	"storage/auth"

	"github.com/gofiber/fiber/v2"
)

type StorageController struct{}

var storageController = new(StorageController)

func Controller() *StorageController {
	return storageController
}

func (s *StorageController) Load(router fiber.Router) {
	router.Get("/:path/:id", Service().GetAsset)

	router.Put("/:path/:id", auth.Service().AuthMiddleware, Service().Upload)
	router.Put("/:path", auth.Service().AuthMiddleware, Service().Upload)
	router.Delete("/:path/:id", auth.Service().AuthMiddleware, Service().Delete)
}
