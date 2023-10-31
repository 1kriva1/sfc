import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { DataService } from "../data/data.service";
import { IGetDataResponse } from "../data/models/get-data.response";
import { IEnumsModel } from "./models/enums.model";

@Injectable({
    providedIn: 'root'
})
export class EnumService {
    public enums: IEnumsModel = {
        footballPositions: [],
        gameStyles: [],
        statCategories: [],
        statSkills: [],
        statTypes: [],
        workingFoots: []
    };

    constructor(private dataService: DataService) { }

    public load(): Observable<IEnumsModel> {
        return this.dataService.get().pipe(
            tap((response: IGetDataResponse) => {
                this.enums = {
                    footballPositions: response.FootballPositions.map(value => ({
                        key: value.Id,
                        value: value.Title,
                        image: `app/core/assets/images/enums/position/${value.Id}.png`
                    })),
                    gameStyles: response.GameStyles.map(value => ({
                        key: value.Id,
                        value: value.Title,
                        image: `app/core/assets/images/enums/game-style/${value.Id}.png`
                    })),
                    workingFoots: response.WorkingFoots.map(value => ({
                        key: value.Id,
                        value: value.Title,
                        image: `app/core/assets/images/enums/foot/${value.Id}.png`
                    })),
                    statCategories: response.StatCategories.map(value => ({ key: value.Id, value: value.Title })),
                    statSkills: response.StatSkills.map(value => ({ key: value.Id, value: value.Title })),
                    statTypes: response.StatTypes.map(value => ({
                        key: value.Id,
                        value: value.Title,
                        category: value.Category,
                        skill: value.Skill
                    }))
                };
            }),
            map(() => this.enums)
        );
    }
}