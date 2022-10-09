import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Movie {
    @Prop({unique:true})
    movieTitle: String;

    @Prop()
    releaseDate: Date;

    @Prop()
    movieType: String;

    @Prop()
    movieDirector: String;
}
export type MovieModel = Movie & Document;
export const MovieSchema = SchemaFactory.createForClass(Movie)