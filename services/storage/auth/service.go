package auth

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"log"
	commonHttp "storage/common/http"
	"storage/config"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	token string
}

var authService = new(AuthService)

func Service() *AuthService {
	return authService
}

func (c *AuthService) SetToken(token string) {
	c.token = token
	return
}

func (c *AuthService) GenerateToken(key string) string {
	hash, err := bcrypt.GenerateFromPassword([]byte(key), 16)
	if err != nil {
		log.Fatal(err)
	}

	return base64.StdEncoding.EncodeToString(hash)
}

func (c *AuthService) VerifyToken(token string, bearer bool) (val bool) {
	if bearer == true {
		val = "Bearer "+c.token == token
	} else {
		val = c.token == token
	}
	return
}

func (s *AuthService) AuthMiddleware(c *fiber.Ctx) error {
	token := c.Get("Authorization")

	if !s.VerifyToken(token, true) {
		return commonHttp.ErrorMessage(c, fiber.StatusUnauthorized, "Unauthorized request")
	}

	return c.Next()

}

func init() {
	token := config.GetEnvVariable("TOKEN")

	if token == "" {
		key := config.GetEnvVariable("KEY")
		if key == "" {
			b := make([]byte, 64)
			n, err := rand.Read(b)
			if err != nil {
				log.Fatalln(err.Error())
				return
			}
			key = fmt.Sprint(n)
		}
		token = Service().GenerateToken(key)
	}

	Service().SetToken(token)

	fmt.Println("Your Access Token:", token)
}
