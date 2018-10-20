const Nunu = (list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction, ThisChampion_bonusAD, ThisChampion_maxAD, ThisChampion_bonusMana, EnemyChampion_maxHealth, ThisChampion_healthPercent) => {
    //Sin información importante en pasiva por lo que se ignora
    for (const ability in abilityData["data"][ThisChampion]["spells"]) {
        let list_effect_per_ability = []
        //Q
        if (ability === "0") {
            const Effects = 2
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 60, 100, 140, 180, 220]
                    const Type = "magic damage"
                    const Max = Bases[PointsQ] + (ThisChampion_AP*.5) + (ThisChampion_bonusHealth*.05)
                    const Tag = "Willump takes a bite of a target enemy, dealing damage and healing himself, increased by 50% when below 50% of maximum health."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                //Segundo efecto
                if (i === 1) {
                    const Bases = [0, 37.5, 60, 82.5, 105, 127.5]
                    const Type = "heal"
                    let Max = (Bases[PointsQ]) + (ThisChampion_AP*.5) + (ThisChampion_bonusHealth*.05)
                    if (ThisChampion_healthPercent < .5) {
                        Max *= 1.5
                    }
                    const Tag = "And healing himself, increased by 50% when below 50% of maximum health."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //W
        else if (ability === "1") {
            const Effects = 1
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 180, 225, 270, 315, 360]
                    const Type = "magic damage"
                    const Max = Bases[PointsW] + (ThisChampion_AP*1.5)
                    const Min = 0
                    const Tag = "Willump takes a bite of a target enemy, dealing damage and healing himself, increased by 50% when below 50% of maximum health."
                    const Obj = {Max: Max, Type: Type, Tag: Tag, Min: Min}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //E
        else if (ability === "2") {
            const Effects = 2
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0 , 16, 24, 32, 40, 48]
                    const Type = "magic damage"
                    const Max = (Bases[PointsE]*9) + (ThisChampion_AP*.05*9)
                    const Min = Bases[PointsE] + (ThisChampion_AP*.05)
                    const Tag = "Nunu launches a ball of ice at the targeted enemy, dealing magic damage, crippling by 25%, and slowing for 2 seconds."
                    const Obj = {Max: Max, Type: Type, Tag: Tag, Min: Min}
                    list_effect_per_ability.push(Obj)
                }
                //Segundo efecto
                if (i === 2) {
                    const Bases = [0 , 20 , 30 , 40 , 50 , 60]
                    const Type = "magic damage"
                    const Max = Bases[PointsE] + (ThisChampion_AP*.5)
                    const Tag = "Nunu launches a ball of ice at the targeted enemy, dealing magic damage, crippling by 25%, and slowing for 2 seconds."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //R
        else if (ability === "3") {
            const Effects = 2
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0 , 625 , 950 , 1275]
                    const Type = "magic damage"
                    const Max = Bases[PointsR]+(ThisChampion_AP*2.5)
                    const Min = 0
                    const Tag = "When the channel is completed or interrupted, Nunu deals magic damage to all enemies in the area, reduced to 12.5% - 87.5% (based on channel time) if interrupted."
                    const Obj = {Max: Max, Type: Type, Tag: Tag, Min: Min}
                    list_effect_per_ability.push(Obj)
                }
                //Segundo efecto
                if (i === 1) {
                    const Bases = [0 , 65 , 75 , 85]
                    const Scaling = [0, .3, .4, .5]
                    const Type = "shield"
                    const Max = Bases[PointsR]+(ThisChampion_bonusHealth*Scaling[PointsR])
                    const Tag = "The duo gains a shield while channeling that refreshes each second."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        list_effects_all_abilities.push(list_effect_per_ability)
    }
    return list_effects_all_abilities
}

export { Nunu }