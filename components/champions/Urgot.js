const Urgot = (list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_maxAD, ThisChampion_bonusHealth) => {
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
                    const BasesMax = [0, 25 , 70 , 115 , 160 , 205 ]
                    const Scaling = [0, .7, .7, .7, .7, .7]
                    const Type = "physical damage"
                    const Max = BasesMax[PointsQ] + (Scaling[PointsQ]*ThisChampion_maxAD)
                    const Tag = "Urgot launches a canister at the target location that explodes after 0.6 seconds, dealing physical damage."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
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
                    const Bases = [0, 12 , 12 , 12 , 12 , 12]
                    const Scaling = [0, .2, .24, .28, .32, .36]
                    const Type = "physical damage"
                    const Max = (Bases[PointsW] + (Scaling[PointsW]*ThisChampion_maxAD))*12
                    const Tag = "The first deals physical damage to all enemies in an arc."
                    const Obj = {Max: Max, Type: Type, Tag: Tag, Min: 0}
                    list_effect_per_ability.push(Obj)
                }
                //Segundo efecto
                else if (i === 2) {
                    const Bases = [0, 60 , 90 , 120 , 150 , 180]
                    const Scaling = [0, .3, .3, .3, .3, .3]
                    const Type = "shield"
                    const Max = Bases[PointsW] + (Scaling[PointsW]*ThisChampion_bonusHealth)
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
                    const Bases = [0, 60 , 100 , 140 , 180 , 220]
                    const Scaling = [0, 0.5, 0.5, 0.5, 0.5, 0.5]
                    const Type = "physical damage"
                    const Max = Bases[PointsE] + (Scaling[PointsE]*ThisChampion_maxAD)
                    const Tag = "After 0.25 seconds, Urgot dashes in the target direction, though not through terrain, dealing physical damage to all enemies in the way."
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
                    const Bases = [0, 50 , 175 , 300]
                    const Scaling = [0, .5, .5, .5]
                    const Type = "physical damage"
                    const Max = Bases[PointsR] + (Scaling[PointsE]*ThisChampion_maxAD)
                    const Tag = "Urgot fires a chem-drill forward that impales the first enemy champion struck, dealing physical damage."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        list_effects_all_abilities.push(list_effect_per_ability)
    }
    return list_effects_all_abilities
}

const UrgotPassive  = (list_effects_passive, ThisChampion_level, ThisChampion_maxAD, EnemyChampion_maxHealth) => {
    const Effects = 1
    for (let i = 1; i <= Effects; i++) {
        //Primer efecto
        if (i === 1) {
            const Bases1 = [0, .4, .4, .4, .4, .4, .5, .5, .5, .65, .65, .8, .8, .9, .9, 1, 1, 1, 1]
            const Bases2 = [0, .02, .02, .02, .02, .02, .03, .03, .03, .04, .04, .06, .06, .08, .08, .08, .08, .08, .08]
            const Type = "physical damage"
            const Max = (ThisChampion_maxAD * Bases1[ThisChampion_level]) + (Bases2[ThisChampion_level] * EnemyChampion_maxHealth)
            const Min = Max * .7
            const Tag = "The next basic attack in the direction of a loaded shotgun causes it to fire, dealing 40 - 100 (based on level)% AD (+ 2 / 3 / 4 / 6 / 8% of target's maximum health) physical damage to all enemies hit within, up to 60 - 360 (based on level) against monsters. Echoing Flames deals 10% reduced damage to enemies it has damaged in the last 5 seconds, stacking up to 3 times."
            const Obj = {Max: Max, Type: Type, Tag: Tag, Min: Min}
            list_effects_passive.push(Obj)
        }
    }
    return list_effects_passive
}

export { Urgot, UrgotPassive }