<p align="center">
  <a href="https://fullcycle.com.br/" target="blank"><img src="https://s3.amazonaws.com/code.education/Wallpapers/Wallpaper-02-Full-Cycle-1920x1080.png"/></a>
</p>

## Descrição

Microsserviço de catálogo

## Rodar a aplicação

#### Crie os containers com Docker

```bash
$ docker-compose up
```

#### Accesse no browser

```
http://localhost:8000
```

## Sites

### Repositório inicial

https://github.com/codeedu/laravel-microservice-quickstart/tree/master

### Repositório final

https://github.com/codeedu/laravel-microservice-quickstart/tree/course

https://github.com/barryvdh/laravel-ide-helper

### Outros Sites

https://github.com/beyondcode/laravel-dump-server
https://beyondco.de/docs/laravel-dump-server/installation

## Comandos

```
composer require --dev barryvdh/laravel-ide-helper

php artisan ide-helper:generate
php artisan ide-helper:models
composer require --dev doctrine/dbal:~2.3
php artisan ide-helper:meta

composer require --dev beyondcode/laravel-dump-server
php artisan dump-server
dd(\Request::getMethod());
dump(\Request::getMethod());
php artisan dump-server --format=html > dump.html


```
