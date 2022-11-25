## generate migration file

npx sequelize-cli migration:generate --name migration-skeleton

## migration and create modle

npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

## migrate the file

npx sequelize-cli db:migrate
devlopment

## change colom

changeColumn
