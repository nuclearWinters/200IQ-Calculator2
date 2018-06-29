import {
    skillData,
    skillOrder,
    skillChampionMeta
} from "../data/skillData"

const SkillPointsUpdate = (champ, lv, SkillOrder) => {
    const champorder = SkillOrder
    let arrayLv = [[1,4,5,7,9],[2,8,10,12,13],[3,14,15,17,18],[6,11,16]]
    if (champ == 126) {
        arrayLv = [[1,4,5,7,9,11],[3,6,8,10,12,13],[2,14,15,16,17,18],[]]
    }
    else if (champ == 13) {
        arrayLv = [[2,4,5,7,13,14],[1,8,9,10,12],[3,15,16,17,18],[6,11]]
    }
    else if (champ == 77) {
        arrayLv = [[1,4,5,7,9],[2,6,8,10,11],[3,12,13,14,15],[16,17,18]]
    }
    let dict_secuence = {"0": 0,"1": 0,"2": 0,"3": 0}
    const RPlus = [43,76,60,126]
    if (RPlus.includes(champ)) {
        dict_secuence["3"] += 1
    }
    for (const secuence in arrayLv) {
        for (const secuenceByLevel in arrayLv[secuence]){
            if (lv >= arrayLv[secuence][secuenceByLevel]) {
                dict_secuence[secuence] += 1
            }
        }
    }
    let arraySkills = [null,null,null]
    if (champ == 77) {
        const arrayUp = [dict_secuence[0], dict_secuence[1], dict_secuence[2], dict_secuence[3]]
        let numbers = ["0","1","2","3"]
        arraySkills = [null,null,null,null]
        for (const order in champorder) {
            for (const number in numbers) {
                if (champorder[order] == numbers[number]) {
                    arraySkills[number] = arrayUp[order]
                }
            }
        }
    }
    else if (champ == 13) {
        arraySkills = [dict_secuence[0], dict_secuence[2], dict_secuence[1], dict_secuence[3]]
    }
    else {
        const arrayUp = [dict_secuence[0], dict_secuence[1], dict_secuence[2]]
        let numbers = ["0","1","2"]
        arraySkills = [null,null,null]
        for (const order in champorder) {
            for (const number in numbers) {
                if (champorder[order] == numbers[number]) {
                    arraySkills[number] = arrayUp[order]
                }
            }
        }
        arraySkills.push(dict_secuence[3])
    }
    return arraySkills
}

export { SkillPointsUpdate }