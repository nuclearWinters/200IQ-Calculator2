const Warwick = (list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction, ThisChampion_bonusAD, ThisChampion_maxAD, ThisChampion_bonusMana, EnemyChampion_maxHealth, ThisChampion_healthPercent, OnHit, EnemyChampion_physicalDamageReduction) => {
    //Sin información importante en pasiva por lo que se ignora
    for (const ability in abilityData["data"][ThisChampion]["spells"]) {
        let list_effect_per_ability = []
        //Q
        if (ability === "0") {
            const Effects = 2
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Scaling = [0 , .06 , .065 , .07 , .075 , .08]
                    const Type = "on-hit"
                    const Max = (((ThisChampion_AP*.9)+(ThisChampion_maxAD*1.2)+(EnemyChampion_maxHealth*Scaling[PointsQ]))*EnemyChampion_magicDamageReduction) + (OnHit.MagicDamage * EnemyChampion_magicDamageReduction) + (OnHit.PhysicalDamage * EnemyChampion_physicalDamageReduction) + (OnHit.TrueDamage)
                    const Tag = "Warwick dashes unstoppably to the target enemy and bites them, dealing magic damage, applying on-hit effects and healing himself for a portion of the damage dealt."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                //Segundo efecto
                if (i === 2) {
                    const Scaling1 = [0 , .06 , .065 , .07 , .075 , .08]
                    const Scaling2 = [0 , .3 , .4 , .5 , .6 , .7]
                    const Type = "heal"
                    const Max = ((ThisChampion_AP*.9)+(ThisChampion_maxAD*1.2)+(EnemyChampion_maxHealth*Scaling1[PointsQ]))*EnemyChampion_magicDamageReduction*Scaling2[PointsQ]
                    const Tag = "Warwick dashes unstoppably to the target enemy and bites them, dealing magic damage, applying on-hit effects and healing himself for a portion of the damage dealt."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //W
        else if (ability === "1") {
        }
        //E
        else if (ability === "2") {
        }
        //R
        else if (ability === "3") {
            const Effects = 2
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0 , 175 , 350 , 525]
                    const Type = "on-hit"
                    const Max = ((Bases[PointsR]+(ThisChampion_bonusAD*1.67))*EnemyChampion_magicDamageReduction)+(((OnHit.MagicDamage * EnemyChampion_magicDamageReduction) + (OnHit.PhysicalDamage * EnemyChampion_physicalDamageReduction) + (OnHit.TrueDamage))*3)
                    const Tag = "Warwick channels while the target is suppressed, dealing magic damage and applying on-hit effects once every 0.5 seconds."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                else if (i === 2) {
                    const Bases = [0 , 175 , 350 , 525]
                    const Type = "heal"
                    const Max = ((Bases[PointsR]+(ThisChampion_bonusAD*1.67))*EnemyChampion_magicDamageReduction)+(((OnHit.MagicDamage * EnemyChampion_magicDamageReduction) + (OnHit.PhysicalDamage * EnemyChampion_physicalDamageReduction) + (OnHit.TrueDamage))*3)
                    const Tag = "Infinite Duress heals Warwick for all the damage dealt."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        list_effects_all_abilities.push(list_effect_per_ability)
    }
    return list_effects_all_abilities
}

const WarwickPassive  = (list_effects_passive, ThisChampion_healthPercent, ThisChampion_level) => {
    const Effects = 1
    for (let i = 1; i <= Effects; i++) {
        //Primer efecto
        if (i === 1) {
            const Bases = [0, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44]
            const Type = "heal"
            let Max = 0
            if (ThisChampion_healthPercent < .5) {
                Max = Bases[ThisChampion_level]
            }
            if (ThisChampion_healthPercent <.25) {
                Max = Bases[ThisChampion_level]*3
            }
            const Tag = "While below 50% maximum health, Warwick's basic attacks also heal him for the same amount, with the healing tripled to 30 - 132 (based on level) while below 25% maximum health."
            const Obj = {Max: Max, Type: Type, Tag: Tag}
            list_effects_passive.push(Obj)
        }
    }
    return list_effects_passive
}

export { Warwick, WarwickPassive }