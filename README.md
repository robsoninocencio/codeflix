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
https://github.com/robsoninocencio/backend-codeflix

### Outros Sites

https://github.com/beyondcode/laravel-dump-server
https://beyondco.de/docs/laravel-dump-server/installation
https://www.postman.com/
https://insomnia.rest/
https://github.com/barryvdh/laravel-ide-helper

https://pt.wikipedia.org/wiki/Teste_de_software
https://laravel.com/docs/6.x/testing
https://phpunit.readthedocs.io/pt_BR/latest/
https://docs.behat.org/en/latest/guides.html

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

php artisan make:model --help

php artisan make:model Models/Category --all
php artisan make:seeder CategoriesTableSeeder

php artisan make:model Models/Genre --all
php artisan make:seeder GenresTableSeeder



php artisan migrate --seed
php artisan migrate:refresh --seed
php artisan migrate:fresh --seed

php artisan tinker
\App\Models\Category::all();
\App\Models\Category::find(5);

php artisan route:list

php artisan make:request CategoryRequest

php artisan migrate:refresh --seed

php artisan tinker
use \App\Models\Category;
Category::find(1)->delete();
Category::find(1)    null
Category::withTrashed()->find(1);
Category::withTrashed()->get();
Category::onlyTrashed()->find(1)->restore();
Category::find(1)->forceDelete();

use Ramsey\Uuid\Uuid;
Uuid::uuid4();
=> Ramsey\Uuid\Uuid {#4391
     uuid: "dd40d795-b5e4-4315-804a-b2c89ec82a25",
   }
echo Uuid::uuid4();
afc48249-e608-4099-bc7d-f94dea370192⏎

vendor/bin/phpunit

php artisan make:test --help
php artisan make:test Models/CategoryTest --unit
vendor/bin/phpunit --filter CategoryTest
vendor/bin/phpunit --filter CategoryTest::testExample
vendor/bin/phpunit tests/Unit/Models/CategoryTest

print_r(array_keys(class_uses(Category::class)));

```
