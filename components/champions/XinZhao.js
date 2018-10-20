const XinZhao = (list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_bonusAD, ThisChampion_maxAD, EnemyChampion_currentHealth) => {
    //Sin información importante en pasiva por lo que se ignora
    for (const ability in abilityData["data"][ThisChampion]["spells"]) {
        let list_effect_per_ability = []
        //Q
        if (ability === "0") {
            //¿Cuantos efectos tiene la habilidad?
            const Effects = 1
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const BasesMax = [0, 60 , 75 , 90 , 105 , 120]
                    const BasesMin = [0, 20 , 25 , 30 , 35 , 40]
                    const ScalingMin = [0, .4, .4, .4, .4, .4]
                    const ScalingMax = [0, 1.2, 1.2, 1.2, 1.2, 1.2]
                    const Type = "physical damage"
                    const Max = BasesMax[PointsQ] + (ScalingMax[PointsQ]*ThisChampion_bonusAD)
                    const Min = BasesMin[PointsQ] + (ScalingMin[PointsQ]*ThisChampion_bonusAD)
                    const Tag = "For the next 5 seconds, Xin Zhao's next 3 basic attacks each deal bonus physical damage."
                    const Obj = {Max: Max, Type: Type, Tag: Tag, Min: Min}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //W
        if (ability === "1") {
            const Effects = 2
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 30 , 40 , 50 , 60 , 70]
                    const Scaling = [0, .3, .3, .3, .3, .3]
                    const Type = "physical damage"
                    const Max = Bases[PointsW] + (Scaling[PointsW]*ThisChampion_maxAD)
                    const Tag = "The first deals physical damage to all enemies in an arc."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                //Segundo efecto
                else if (i === 2) {
                    const Bases = [0, 30 , 65 , 100 , 135 , 170 ]
                    const Scaling = [0, .75, .75, .75, .75, .75]
                    const Type = "physical damage"
                    const Max = Bases[PointsW] + (Scaling[PointsW]*ThisChampion_maxAD)
                    const Tag = "The second deals physical damage in a line, slowing all enemies hit by 50% for 1.5 seconds."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //E
        if (ability === "2") {
            const Effects = 1
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 50 , 75 , 100 , 125 , 150]
                    const Scaling = [0, 0.6, 0.6, 0.6, 0.6, 0.6]
                    const Type = "magic damage"
                    const Max = Bases[PointsE] + (Scaling[PointsE]*ThisChampion_AP)
                    const Tag = "Every fourth basic attack deals bonus magic damage."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //R
        if (ability === "3") {
            const Effects = 1
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 75 , 175 , 275]
                    const Scaling = [0, 1, 1, 1]
                    const Type = "physical damage"
                    const Max = Bases[PointsR] + (Scaling[PointsE]*ThisChampion_bonusAD) + (EnemyChampion_currentHealth*.15)
                    const Tag = "Every fourth basic attack deals bonus magic damage."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        list_effects_all_abilities.push(list_effect_per_ability)
    }
    return list_effects_all_abilities
}

const XinZhaoPassive  = (list_effects_passive, ThisChampion_level, ThisChampion_maxAD, ThisChampion_AP) => {
    const Effects = 2
    for (let i = 1; i <= Effects; i++) {
        //Primer efecto
        if (i === 1) {
            const Bases = [0, .15 , .15 , .15, .15, .15, .25, .25, .25, .25, .25, .35, .35, .35, .35, .35, .45, .45, .45]
            const Type = "physical damage"
            const Max = ThisChampion_maxAD * Bases[ThisChampion_level]
            const Tag = "Every third basic attack or Wind Becomes Lightning strike deals 15 / 25 / 35 / 45% AD Attack damage bonus physical damage"
            const Obj = {Max: Max, Type: Type, Tag: Tag}
            list_effects_passive.push(Obj)
        }
        //Segundo efecto
        if (i === 2) {
            const Bases = [0, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50, 53, 56, 59]
            const Type = "heal"
            const Max = Bases[ThisChampion_level] + (ThisChampion_maxAD * .1) + (ThisChampion_AP * .4)
            const Tag = "Restores 8 - 59 (based on level) (+ 10% AD) (+ 40% AP) health."
            const Obj = {Max: Max, Type: Type, Tag: Tag}
            list_effects_passive.push(Obj)
        }
    }
    return list_effects_passive
}            

export { XinZhao, XinZhaoPassive }