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

#### Acesse no browser

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

https://www.php.net/manual/pt_BR/book.image.php
https://www.php.net/manual/pt_BR/book.imagick.php

https://storage.googleapis.com/codeflix-storage/Myfamily.png

https://github.com/Superbalist/laravel-google-cloud-storage

## Criando um Recurso CastMember

```
php artisan make:model --all Models/CastMember

php artisan make:seeder CastMembersTableSeeder

php artisan migrate --seed
php artisan migrate:fresh --seed

php artisan route:list

php artisan make:test Models/CastMemberTest --unit

php artisan make:test Models/CastMemberTest

php artisan make:test Http/Controllers/Api/CastMemberControllerTest
```

## Criando um Recurso Video

```
php artisan make:model --all Models/Video

php artisan make:seeder VideosTableSeeder

php artisan migrate --seed
php artisan migrate:fresh --seed

php artisan route:list

php artisan make:test Models/VideoUnitTest --unit

php artisan make:test Models/VideoTest

php artisan make:test Http/Controllers/Api/VideoControllerTest
```

## Criando o relacionamento de video com category

Quem vem primeiro em ordem alfabética e no singular

```
php artisan make:migration create_category_video_table

```

## Criando o relacionamento de video com genre

Quem vem primeiro em ordem alfabética e no singular

```
php artisan make:migration create_genre_video_table

```

## Criando o relacionamento de category com genre

Quem vem primeiro em ordem alfabética e no singular

```
php artisan make:migration create_category_genre_table

```

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

docker-compose exec app bash
printenv

php artisan make:test Models/CategoryTest

php artisan make:test Http/Controllers/Api/CategoryControllerTest

php artisan make:rule GenresHasCategoriesRule

docker-compose up -d --force-recreate --build

php -m

composer require superbalist/laravel-google-cloud-storage

storage@backend-codeflix.iam.gserviceaccount.com
114542174447744276625

gcloud kms encrypt \
--ciphertext-file=./storage/credentials/google/service-account-storage.json.enc \
--plaintext-file=./storage/credentials/google/service-account-storage.json \
--location=global \
--keyring=testing-lesson \
--key=service-account

gcloud kms decrypt \
--ciphertext-file=./storage/credentials/google/service-account-storage.json.enc \
--plaintext-file=./storage/credentials/google/service-account-storage.json \
--location=global \

--keyring=testing-lesson \
--key=service-account


php artisan storage:link
php artisan tinker
$video = \App\Models\Video::first();
$video->video_file_url
=> "http://localhost:8000/storage/videos/04476ec6-e222-4ad4-b68a-53ddc072cb87/U3P5eprOlNsdEZZLVWgnDZTpD6rIu3AbuQqPTQvW.mp4"


https://laravel.com/docs/6.x/eloquent-resources#introduction

php artisan make:resource CategoryResource
php artisan make:resource CategoryCollection --collection

php artisan tinker

---------------------------------
$ref = new \ReflectionClass(\App\Http\Resources\CategoryResource::class);

$ref->isSubclassOf(\Illuminate\Http\Resources\Json\ResourceCollection::class);

false

--------------------------------
$ref = new \ReflectionClass(\App\Http\Resources\CategoryCollection::class);

$ref->isSubclassOf(\Illuminate\Http\Resources\Json\ResourceCollection::class);

true
-------------------------------

dd($response->content());


```
