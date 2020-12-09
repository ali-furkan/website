package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func GetEnvVariable(key string) string {
	return os.Getenv(key)
}

func GetRootPath() string {
	path := "/"
	envPath := GetEnvVariable("ROOT_PATH")

	if envPath != "" {
		path = envPath
	}

	return path
}

func init() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
		return
	}
}
