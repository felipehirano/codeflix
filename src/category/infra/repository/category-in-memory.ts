import { Category } from "../../domain/entities/category";
import {InMemorySearchableRepositoryInterface} from "../../../@seedwork/domain/repository/in-memory-repository";
import CategoryRepository from "category/domain/repository/category-repository";

export default class CategoryInMemoryRepository extends InMemorySearchableRepositoryInterface<Category> 
    implements CategoryRepository {

}