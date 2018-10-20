const Sivir = (list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction, ThisChampion_bonusAD, ThisChampion_maxAD, ThisChampion_bonusMana, EnemyChampion_maxHealth) => {
    //Sin información importante en pasiva por lo que se ignora
    for (const ability in abilityData["data"][ThisChampion]["spells"]) {
        let list_effect_per_ability = []
        //Q
        if (ability === "0") {
            const Effects = 1
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 64.75 , 101.75 , 138.75 , 175.75 , 212.75]
                    const BasesMin = [0, 14 , 22 , 30 , 38 , 46]
                    const Scaling = [0 , 1.295 , 1.48 , 1.665 , 1.85 , 2.035]
                    const ScalingMin = [0 , .28 , .32 , .36 , .40 , .44]
                    const Type = "physical damage"
                    const Max = Bases[PointsQ] + (Scaling[PointsQ]*ThisChampion_maxAD) + (ThisChampion_AP*.925)
                    const Min = BasesMin[PointsQ] + (ScalingMin[PointsQ]*ThisChampion_maxAD) + (ThisChampion_AP*.2)
                    const Tag = "Sivir hurls her crossblade in the target direction. Enemies in its path take physical damage, reduced to 100% - 40% (based on enemy hit). Upon reaching maximum range the crossblade returns to her, dealing the same damage."
                    const Obj = {Max: Max, Type: Type, Tag: Tag, Min: Min}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //W
        else if (ability === "1") {
            const Effects = 2
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Scaling = [0 , 1.50 , 1.65 , 1.80 , 1.95 , 2.10]
                    const ScalingMin = [0 , .50 , .55 , .60 , .65 , .70]
                    const Type = "physical damage"
                    const Max = (ThisChampion_maxAD*Scaling[PointsW])
                    const Min = (ThisChampion_maxAD*ScalingMin[PointsW])
                    const Tag = "Sivir's next 3 basic attacks within 4 seconds bounce to nearby unaffected units, dealing them physical damage, until none remain in range. "
                    const Obj = {Max: Max, Type: Type, Tag: Tag, Min: Min}
                    list_effect_per_ability.push(Obj)
                }
                if (i === 2) {
                    const Scaling = [0 , 3 , 3.3 , 3.6 , 3.9 , 4.2]
                    const ScalingMin = [0 , .50 , .55 , .60 , .65 , .70]
                    const Type = "physical damage"
                    const Max = (ThisChampion_maxAD*Scaling[PointsW])
                    const Min = (ThisChampion_maxAD*ScalingMin[PointsW])
                    const Tag = "If Sivir critically strikes her target, the bounces do so as well."
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

export { Sivir }