//DTO = its like a blue print. data transfer object. use decorators to validate objects that goes thoru the db. helps to catch errors without wasting time. is spesifies that when the error is on variables.
// the the dto is very usefull to catch errors.

import {  IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsString } from "class-validator";

export class CreateSongDTO{

    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    @IsArray()
    @IsString({each:true})
    readonly artists: string[];

    @IsNotEmpty()
    @IsDateString()
    readonly releasedDate: Date;

    @IsMilitaryTime()
    @IsNotEmpty()
    readonly duration: Date;
}