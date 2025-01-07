import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
export declare class ObjectIdPipe implements PipeTransform {
    transform(objectId: string, metadata: ArgumentMetadata): string;
}
