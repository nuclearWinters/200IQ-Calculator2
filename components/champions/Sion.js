const Sion = (list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_lv, ThisChampion_currentHealth, ThisChampion_maxHealth, ThisChampion_bonusHealth, EnemyChampion_magicDamageReduction, ThisChampion_bonusAD, ThisChampion_maxAD, ThisChampion_bonusMana, EnemyChampion_maxHealth) => {
    //Sin información importante en pasiva por lo que se ignora
    for (const ability in abilityData["data"][ThisChampion]["spells"]) {
        let list_effect_per_ability = []
        //Q
        if (ability === "0") {
            const Effects = 1
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 90 , 150 , 210 , 270 , 330]
                    const BasesMin = [0, 30 , 50 , 70 , 90 , 110]
                    const Scaling = [0 , 1.35 , 1.575 , 1.80 , 2.025 , 2.25]
                    const ScalingMin = [0 , .45 , .525 , .60 , .675 , .75]
                    const Type = "physical damage"
                    const Max = Bases[PointsQ] + (Scaling[PointsQ]*ThisChampion_maxAD)
                    const Min = BasesMin[PointsQ] + (ScalingMin[PointsQ]*ThisChampion_maxAD)
                    const Tag = "Sion charges for up to 2 seconds to swing in the target direction, increasing Decimating Smash's damage by 0% - 200% (based on channel time)."
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
                    const Bases = [0, 30 , 55 , 80 , 105 , 130]
                    const Scaling = [0 , .08 , .09 , .10 , .11 , .12]
                    const Type = "shield"
                    const Max = Bases[PointsW] + (ThisChampion_maxHealth*Scaling[PointsW]) + (ThisChampion_AP*.4)
                    const Tag = "Sion shields himself for up to 6 seconds."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                if (i === 2) {
                    const Bases = [0, 40 , 65 , 90 , 115 , 140]
                    const Scaling = [0 , .10 , .11 , .12 , .13 , .14]
                    const Type = "magic damage"
                    const Max = Bases[PointsW] + (EnemyChampion_maxHealth*Scaling[PointsW]) + (ThisChampion_AP*.4)
                    const Tag = "Soul Furnace's shield detonates to deal magic damage to enemies around Sion"
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //E
        else if (ability === "2") {
            const Effects = 1
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 65 , 100 , 135 , 170 , 205]
                    const Type = "magic damage"
                    const Max = Bases[PointsE] + (.55*ThisChampion_AP)
                    const Tag = "Sion bellows in the target direction, dealing magic damage to the first enemy hit"
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
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
                    const Bases = [0, 400 , 800 , 1200]
                    const BasesMin = [0, 150 , 300 , 450]
                    const Type = "physical damage"
                    const Max = Bases[PointsR] + (.8*ThisChampion_bonusAD)
                    const Min = BasesMin[PointsR] + (.4*ThisChampion_bonusAD)
                    const Tag = "The slam deals physical damage to nearby enemies and turrets, with the base damage increasing by 0% - 266.67% (based on charge time), the bonus AD ratio increasing by 0% - 100% (based on charge time)."
                    const Obj = {Max: Max, Type: Type, Tag: Tag, Min: Min}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        list_effects_all_abilities.push(list_effect_per_ability)
    }
    return list_effects_all_abilities
}

export { Sion }