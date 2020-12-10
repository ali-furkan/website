package config

import (
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type ConfigService struct {
	MaxRes   int
	Lossless bool
	RootPath string
}

var config = new(ConfigService)

func Config() *ConfigService {
	return config
}

func GetRootPath() string {
	if config.RootPath != "" {
		return config.RootPath
	}
	path := "/"
	envPath := GetEnvVariable("ROOT_PATH")

	if envPath != "" {
		path = envPath
	}
	config.RootPath = path
	return path
}

func GetMaxResolution() int {
	if config.MaxRes != 0 {
		return config.MaxRes
	}
	var err error
	maxRes := 2048
	maxResEnv := GetEnvVariable("MAX_RESOLUTION")
	if maxResEnv != "" {
		if maxRes, err = strconv.Atoi(maxResEnv); err != nil {
			maxRes = 2048
		}
	}
	config.MaxRes = maxRes
	return maxRes
}

func GetEnvVariable(key string) string {
	return os.Getenv(key)
}

func init() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
		return
	}
}
