const MasterYi = (list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction, ThisChampion_bonusAD, ThisChampion_maxAD) => {
    //Sin información importante en pasiva por lo que se ignora
    for (const ability in abilityData["data"][ThisChampion]["spells"]) {
        let list_effect_per_ability = []
        //Q
        if (ability === "0") {
            const Effects = 1
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 25 , 60 , 95 , 130 , 165]
                    const Type = "physical damage"
                    const Min = Bases[PointsQ] + (1*ThisChampion_maxAD)
                    const Max = Bases[PointsQ] + (1.6*ThisChampion_maxAD)
                    const Tag = "After a small delay, Master Yi becomes untargetable and bounces on up to 4 Sight icon visible enemies that are up to 600 units away from each other, starting from the targeted enemy and prioritizing the closest ones, to then blink in front of his primary target and dealing physical damage to all enemies that he touched."
                    const Obj = {Max: Max, Type: Type, Tag: Tag, Min: Min}
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
                    const Bases = [0, 240 , 400 , 560 , 720 , 880]
                    const BasesMin = [0, 15 , 25 , 35 , 45 , 55]
                    const Scaling = [0, 2, 2, 2, 2, 2]
                    const ScalingMin = [0, .125, .125, .125, .125, .125]
                    const Type = "heal"
                    const Max = Bases[PointsW] + (Scaling[PointsW]*ThisChampion_AP)
                    const Min = BasesMin[PointsW] + (ScalingMin[PointsW]*ThisChampion_AP)
                    const Tag = "Master Yi channels for up to 4 seconds, healing himself every 0.5 seconds, increased by 0% - 100% (based on missing health)."
                    const Obj = {Max: Max, Type: Type, Tag: Tag, Min: Min}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //E
        else if (ability === "2") {
        }
        //R
        else if (ability === "3") {
        }
        list_effects_all_abilities.push(list_effect_per_ability)
    }
    return list_effects_all_abilities
}

const MasterYiPassive  = (list_effects_passive, EnemyChampion_magicDamageReduction, EnemyChampion_physicalDamageReduction, ThisChampion_maxAD, OnHit) => {
    const Effects = 1
    for (let i = 1; i <= Effects; i++) {
        //Primer efecto
        if (i === 1) {
            const Type = "on-hit"
            const Max = (ThisChampion_maxAD* EnemyChampion_physicalDamageReduction) + (OnHit.MagicDamage * EnemyChampion_magicDamageReduction) + (OnHit.PhysicalDamage * EnemyChampion_physicalDamageReduction) + (OnHit.TrueDamage)
            const Min = (ThisChampion_maxAD * .5 * EnemyChampion_physicalDamageReduction) + (OnHit.MagicDamage * EnemyChampion_magicDamageReduction) + (OnHit.PhysicalDamage * EnemyChampion_physicalDamageReduction) + (OnHit.TrueDamage)
            const Tag = "With every fourth basic attack (within 4 seconds of each other), Master Yi strikes twice, the second strike dealing 50% AD Attack damage physical damage. The second strike applies on-hit effects and can critically strike dealing 50% AD Attack damage bonus physical damage."
            const Obj = {Max: Max, Type: Type, Tag: Tag, Min: Min}
            list_effects_passive.push(Obj)
        }
    }
    return list_effects_passive
}

export { MasterYi, MasterYiPassive }