const Karma = (list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, ThisChampion_healthPercent, ThisChampion_maxHealth) => {    
    //Sin información importante en pasiva por que se ignora
    for (const ability in abilityData["data"][ThisChampion]["spells"]) {
        let list_effect_per_ability = []
        //Q
        if (ability === "0") {
            //¿Cuantos efectos tiene la habilidad?
            const Effects = 3
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 80, 125, 170, 215, 260 ]
                    const Scaling = [0, 0.6, 0.6, 0.6, 0.6, 0.6]
                    const Type = "magic damage"
                    const Max = Bases[PointsQ] + (Scaling[PointsQ]*ThisChampion_AP)
                    const Tag = "Karma fires a burst of energy that detonates upon hitting an enemy, dealing magic damage to all nearby enemies."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                if (i === 2) {
                    const Bases = [0, 80, 125, 170, 215, 260 ]
                    const Scaling = [0, 0.6, 0.6, 0.6, 0.6, 0.6]
                    const BasesRankR = [0, 25, 75, 125, 175]
                    const ScalingRankR = [0, 0.3, 0.3, 0.3, 0.3]
                    const Type = "magic damage"
                    const Max = Bases[PointsQ] + (Scaling[PointsQ]*ThisChampion_AP) + BasesRankR[PointsR] + (ScalingRankR[PointsR]*ThisChampion_AP)
                    const Tag = "MANTRA - SOULFLARE: Inner Flame detonates upon hitting an enemy or reaching maximum range, dealing bonus magic damage in an increased area and leaving an area around it for 1.5 seconds."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    console.log(Obj)
                    list_effect_per_ability.push(Obj)
                }
                if (i === 3) {
                    const Bases = [0, 35, 140, 245, 350 ]
                    const Scaling = [0, 0.6, 0.6, 0.6, 0.6, 0.6]
                    const Type = "magic damage"
                    const Max = Bases[PointsR] + (Scaling[PointsR]*ThisChampion_AP)
                    const Tag = "MANTRA - SOULFLARE: At the end of its duration, the area explodes, dealing magic damage to all enemies inside."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    console.log(Obj)
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //W
        if (ability === "1") {
            const Effects = 3
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 30, 55, 80, 105, 130]
                    const Scaling = [0, 0.45, 0.45, 0.45, 0.45, 0.45]
                    const Type = "magic damage"
                    const Max = (Bases[PointsW] + (Scaling[PointsW]*ThisChampion_AP))
                    const Tag = "Karma forms a tether between her and the target enemy champion or monster for 2 seconds, dealing them magic damage."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                //Segundo efecto
                if (i === 2) {
                    const Bases = [0, 30, 55, 80, 105, 130]
                    const Scaling = [0, 0.45, 0.45, 0.45, 0.45, 0.45]
                    const Type = "magic damage"
                    const Max = (Bases[PointsW] + (Scaling[PointsW]*ThisChampion_AP))
                    const Tag = "If the target does not break the tether, it deals them magic damage again and they are Root icon rooted for a short time."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                //Tercer efecto
                if (i === 3) {
                    const Bases = [0, .2, .2, .2, .2, .2]
                    const Scaling = [0, .01, .01, .01, .01, .01]
                    const Type = "heal"
                    const Max = ((1-ThisChampion_healthPercent)*ThisChampion_maxHealth)*(Bases[PointsW] + ((Scaling[PointsW]*ThisChampion_AP)/100))
                    const Tag = "MANTRA - RENEWAL: Focused Resolve heals Karma for 20% (+ 1% per 100 AP) missing health upon being cast and once more upon Root icon rooting its target, with the Root icon root duration increased."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //E
        if (ability === "2") {
            const Effects = 3
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 70, 95, 120, 145, 170]
                    const Scaling = [0, 0.5, 0.5, 0.5, 0.5, 0.5]
                    const Type = "shield"
                    const Max = Bases[PointsE] + (Scaling[PointsE]*ThisChampion_AP)
                    const Tag = "Karma shields the target allied champion or herself for 4 seconds."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                //Segundo efecto
                if (i === 2) {
                    const Bases = [0, 70, 95, 120, 145, 170]
                    const BasesRankR =  [30, 90, 150, 210]
                    const Scaling = [0, 0.5, 0.5, 0.5, 0.5, 0.5]
                    const ScalingRankR = [0, 0.6, 0.6, 0.6, 0.6]
                    const Type = "shield"
                    const Max = Bases[PointsE] + (Scaling[PointsE]*ThisChampion_AP) + BasesRankR[PointsR] + (ScalingRankR[PointsR]*ThisChampion_AP)
                    const Tag = " MANTRA - DEFIANCE: Inspire overflows with energy, increasing the target's shield."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    console.log(Obj)
                    list_effect_per_ability.push(Obj)
                }
                //Tercer efecto
                if (i === 3) {
                    const Bases = [0, 9, 27, 45, 63]
                    const Scaling = [0, 0.18, 0.18, 0.18, 0.18]
                    const Type = "shield"
                    const Max = Bases[PointsR] + (Scaling[PointsR]*ThisChampion_AP)
                    const Tag = "MANTRA - DEFIANCE: Shielding all nearby allied champions for 30% of the total amount."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    console.log(Obj)
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //R
        if (ability === "3") {
            //No hay efectos
        }
        list_effects_all_abilities.push(list_effect_per_ability)
    }
    return list_effects_all_abilities
}

export { Karma }