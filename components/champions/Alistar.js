const Alistar = (list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction, ThisChampion_bonusAD, ThisChampion_maxAD) => {
    //Sin información importante en pasiva por lo que se ignora
    for (const ability in abilityData["data"][ThisChampion]["spells"]) {
        let list_effect_per_ability = []
        //Q
        if (ability === "0") {
            const Effects = 1
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 60 , 105 , 150 , 195 , 240]
                    const Type = "magic damage"
                    const Max = Bases[PointsQ] + (.5*ThisChampion_AP)
                    const Tag = "Alistar slams the ground beneath him, dealing Ability power magic damage to all nearby enemies."
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
                    const Bases = [0, 55 , 110 , 165 , 220 , 275]
                    const Type = "magic damage"
                    const Max = Bases[PointsW] + (.7*ThisChampion_AP)
                    const Tag = "Alistar dashes to the target enemy, dealing magic damage."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
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
                    const Bases = [0, 100 , 125 , 150 , 175 , 200]
                    const BasesMin = [0, 10 , 12.5 , 15 , 17.5 , 20]
                    const Type = "magic damage"
                    const Max = Bases[PointsE] + (.4*ThisChampion_AP)
                    const Min = BasesMin[PointsE] + (.04*ThisChampion_AP)
                    const Tag = "Alistar tramples the ground around him every 0.5 seconds for 5 seconds, dealing magic damage to all nearby enemies and gaining a Trample stack every time the ability damages at least one enemy champion."
                    const Obj = {Max: Max, Type: Type, Tag: Tag, Min: Min}
                    list_effect_per_ability.push(Obj)
                }
                if (i === 2) {
                    const Bases = [0, 55 , 70 , 85 , 100 , 115, 130, 145, 160, 175, 190, 205, 220, 235, 250, 265, 280, 295, 310]
                    const Type = "magic damage"
                    const Max = Bases[ThisChampion_lv]
                    const Tag = "At 5 Trample stacks, Alistar's next basic attack deals 55 - 310 (based on level) bonus magic damage."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //R
        else if (ability === "3") {
        }
        list_effects_all_abilities.push(list_effect_per_ability)
    }
    return list_effects_all_abilities
}

const AlistarPassive  = (list_effects_passive, ThisChampion_level) => {
    const Effects = 1
    for (let i = 1; i <= Effects; i++) {
        //Primer efecto
        if (i === 1) {
            const Bases = [0, 20, 27, 34, 41, 48, 55, 62, 69, 76, 83, 90, 97, 104, 111, 118, 125, 132, 139]
            const Type = "heal"
            const Max = Bases[ThisChampion_level]
            const Tag = "At 7 Triumph stacks, Alistar roars, Heal power healing himself for 20 - 139 (based on level) Health icon health and all nearby allied champions for「 double the amount 」."
            const Obj = {Max: Max, Type: Type, Tag: Tag}
            list_effects_passive.push(Obj)
        }
    }
    return list_effects_passive
}

export { Alistar, AlistarPassive }