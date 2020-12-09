package storage

import (
	"context"
	"io"
	"log"
	"path/filepath"
	commonHttp "storage/common/http"
	"storage/config"

	"cloud.google.com/go/storage"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"google.golang.org/api/option"
)

type StorageService struct{}

var storageService = new(StorageService)
var ctx = context.Background()
var (
	storageClient *storage.Client
	bucket        *storage.BucketHandle
	att           *storage.BucketAttrs
)

func Service() *StorageService {
	return storageService
}

func (s *StorageService) GetAsset(c *fiber.Ctx) error {

	obj := bucket.Object(c.Params("path") + "/" + c.Params("id"))

	nr, err := obj.NewReader(ctx)

	if err != nil {
		return commonHttp.ErrorMessage(c, fiber.StatusBadRequest, err.Error())
	}

	defer nr.Close()

	c.Set("Content-Type", nr.ContentType())

	return c.SendStream(nr)
}

func (s *StorageService) Delete(c *fiber.Ctx) error {

	obj := bucket.Object(c.Params("path") + "/" + c.Params("id"))

	if err := obj.Delete(ctx); err != nil {
		return commonHttp.ErrorMessage(c, fiber.StatusBadRequest, err.Error())
	}

	return c.SendString("Delete" + c.Params("id"))
}

func (s *StorageService) Upload(c *fiber.Ctx) error {
	file, err := c.FormFile("file")

	if err != nil {
		return commonHttp.ErrorMessage(c, fiber.StatusBadRequest, "Form-Data is required")
	}

	f, err := file.Open()

	if err != nil {
		return commonHttp.ErrorMessage(c, fiber.StatusBadRequest, "File is not valid")
	}

	defer f.Close()

	name := c.Params("id")
	if name == "" {
		name = uuid.New().String()
	}

	pathname := c.Params("path") + "/" + name + filepath.Ext(file.Filename)

	obj := bucket.Object(pathname)

	if _, err := obj.NewReader(ctx); err == nil {
		return commonHttp.ErrorMessage(c, fiber.StatusConflict, "This file already exists")
	}

	sw := obj.NewWriter(ctx)

	if _, err := io.Copy(sw, f); err != nil {
		return commonHttp.ErrorMessage(c, fiber.StatusInternalServerError, err.Error())
	}

	if err := sw.Close(); err != nil {
		return commonHttp.ErrorMessage(c, fiber.StatusInternalServerError, err.Error())
	}

	return c.JSON(fiber.Map{
		"message": "Successfully Uploaded",
		"metadata": fiber.Map{
			"type": file.Header["Content-Type"][0],
			"size": file.Size,
			"ext":  filepath.Ext(file.Filename),
		},
		"path": c.BaseURL() + "/" + pathname,
	})
}

func init() {
	var err error

	storageClient, err = storage.NewClient(ctx, option.WithCredentialsFile("firebase.json"))
	if err != nil {
		log.Fatal(err.Error())
	}
	bucket = storageClient.Bucket(config.GetEnvVariable("STORAGE_BUCKET"))

	att, err = bucket.Attrs(ctx)
	if err != nil {
		log.Fatal(err.Error())
	}
}
