import { Injectable, Scope } from '@nestjs/common';

@Injectable({
    scope: Scope.TRANSIENT,
})
export class SongsService {
    //local db
    //local array

    private readonly songs =[];

    create(song){
        //save the songs in db
        this.songs.push(song);
        return this.songs;
    }
    findAll(){
        // throw new Error('Error in Db while fetching record');
        // throw new Error ('Error in db while fetching record');
        return this.songs;
        
    }
}
