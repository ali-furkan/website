package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

var isLoaded bool

func GetEnvVariable(key string) string {
	if isLoaded != true {
		err := godotenv.Load(".env")
		if err != nil {
			log.Fatalf("Error loading .env file")
			return ""
		}
		isLoaded = true
	}
	return os.Getenv(key)
}
