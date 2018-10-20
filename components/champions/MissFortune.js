const MissFortune = (list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction, ThisChampion_bonusAD, ThisChampion_maxAD, ThisChampion_bonusMana, EnemyChampion_maxHealth, ThisChampion_healthPercent, OnHit, EnemyChampion_physicalDamageReduction) => {
    //Sin información importante en pasiva por lo que se ignora
    for (const ability in abilityData["data"][ThisChampion]["spells"]) {
        let list_effect_per_ability = []
        //Q
        if (ability === "0") {
            const Effects = 2
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0 , 20 , 40 , 60 , 80 , 100]
                    const Type = "on-hit"
                    const Max = (((Bases[PointsQ])+(ThisChampion_AP*.35)+ThisChampion_maxAD)*EnemyChampion_physicalDamageReduction)+(OnHit.MagicDamage * EnemyChampion_magicDamageReduction) + (OnHit.PhysicalDamage * EnemyChampion_physicalDamageReduction) + (OnHit.TrueDamage)
                    const Tag = "Miss Fortune fires a shot at a target enemy that deals physical damage, which then bounces to hit another unit behind it. The shot applies on-hit effects, including Love Tap."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                else if (i === 2) {
                    const Bases = [0 , 20 , 40 , 60 , 80 , 100]
                    const Type = "on-hit"
                    const Max = ((((Bases[PointsQ])+(ThisChampion_AP*.35)+ThisChampion_maxAD)*2)*EnemyChampion_physicalDamageReduction) + (OnHit.MagicDamage * EnemyChampion_magicDamageReduction) + (OnHit.PhysicalDamage * EnemyChampion_physicalDamageReduction) + (OnHit.TrueDamage)
                    const Min = ((Bases[PointsQ]+(ThisChampion_AP*.35)+ThisChampion_maxAD)*EnemyChampion_physicalDamageReduction) + (OnHit.MagicDamage * EnemyChampion_magicDamageReduction) + (OnHit.PhysicalDamage * EnemyChampion_physicalDamageReduction) + (OnHit.TrueDamage)
                    const Tag = "Double Up's second shot can critically strike for 100% bonus damage. If Double Up kills the first target, the second shot will always critically strike."
                    const Obj = {Max: Max, Type: Type, Tag: Tag, Min: Min}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //W
        else if (ability === "1") {
        }
        //E
        else if (ability === "2") {
            const Effects = 1
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0 , 80 , 115 , 150 , 185 , 220]
                    const BasesMin = [0 , 10 , 14.375 , 18.75 , 23.125 , 27.5]
                    const Type = "magic damage"
                    const Max = (Bases[PointsE])+(ThisChampion_AP*.8)
                    const Min = (BasesMin[PointsE])+(ThisChampion_AP*.1)
                    const Tag = "Miss Fortune rains down hundreds of bullets onto the target area for 2 seconds, slowing and dealing magic damage every 0.25 seconds to units within the area."
                    const Obj = {Max: Max, Type: Type, Tag: Tag, Min: Min}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //R
        else if (ability === "3") {
            const Effects = 1
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Scaling = [0 , 10.8, 12.6 , 14.4]
                    const ScalingAP = [0 , 2.88, 3.36 , 3.84]
                    const Type = "physical damage"
                    const Max = (ThisChampion_maxAD*Scaling[PointsR])+(ThisChampion_AP*ScalingAP[PointsR])
                    const Min = (ThisChampion_maxAD*.75)+(ThisChampion_AP*.2)
                    const Tag = "Miss Fortune channels for 3 seconds while firing several waves of bullets in a cone, with each wave dealing 75% AD (+ 20% AP) physical damage. Each wave can critically strike, dealing 20% bonus damage."
                    const Obj = {Max: Max, Type: Type, Tag: Tag, Min: Min}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        list_effects_all_abilities.push(list_effect_per_ability)
    }
    return list_effects_all_abilities
}

const MissFortunePassive  = (list_effects_passive, ThisChampion_level, ThisChampion_maxAD) => {
    const Effects = 2
    for (let i = 1; i <= Effects; i++) {
        //Primer efecto
        if (i === 1) {
            const Bases = [0, .5, .5, .5, .6, .6, .6, .7, .7, .8, .8, .9, .9, 1, 1, 1, 1, 1, 1]
            const Type = "physical damage"
            const Max = ThisChampion_maxAD * Bases[ThisChampion_level]
            const Tag = "Miss Fortune's next basic attack against an enemy unit (turrets included), that was not the target of her previous basic attack, will deal 50 - 100 (based on level)% AD bonus physical damage."
            const Obj = {Max: Max, Type: Type, Tag: Tag}
            list_effects_passive.push(Obj)
        }
    }
    return list_effects_passive
}            

export { MissFortune, MissFortunePassive }