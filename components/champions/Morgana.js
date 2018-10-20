const Morgana = (list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP, EnemyChampion_healthPercent) => {
    //Sin información importante en pasiva por que se ignora
    for (const ability in abilityData["data"][ThisChampion]["spells"]) {
        let list_effect_per_ability = []
        //Q
        if (ability === "0") {
            //¿Cuantos efectos tiene la habilidad?
            const Effects = 1
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 80, 135, 190, 245, 300 ]
                    const Scaling = [0, 0.9, 0.9, 0.9, 0.9, 0.9]
                    const Type = "magic damage"
                    const Max = Bases[PointsQ] + (Scaling[PointsQ]*ThisChampion_AP)
                    const Tag = "Morgana releases a sphere of dark magic that travels in a line, dealing magic damage to the first enemy hit and rooting them."
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
                    const Bases = [0, 8, 16, 24, 32, 40]
                    const Scaling = [0, 0.11, 0.11, 0.11, 0.11, 0.11]
                    const Type = "magic damage"
                    const Max = (Bases[PointsW] + (Scaling[PointsW]*ThisChampion_AP)) * (1+((1 - EnemyChampion_healthPercent) * 0.5))
                    const Tag = "Morgana infects the target area for 5 seconds, causing enemies who stand on the location to take magic damage every half second, increased by 0% - 50% (based on target's missing health)."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                //Segundo efecto
                if (i === 2) {
                    const BasesMax = [0, 120, 240, 360, 480, 600]
                    const BasesMin = [0, 80, 160, 240, 320, 400]
                    const ScalingMin = [0, 1.1, 1.1, 1.1, 1.1, 1.1]
                    const ScalingMax = [0, 1.65, 1.65, 1.65, 1.65, 1.65]
                    const Type = "magic damage"
                    const Max = BasesMax[PointsW] + (ScalingMax[PointsW]*ThisChampion_AP)
                    const Min = BasesMin[PointsW] + (ScalingMin[PointsW]*ThisChampion_AP)
                    const Tag = "Minimum and maximum total damage."
                    const Obj = {Max: Max, Type: Type, Tag: Tag, Min: Min}
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
                    const Bases = [0, 70, 140, 210, 280, 350 ]
                    const Scaling = [0, 0.7, 0.7, 0.7, 0.7, 0.7]
                    const Type = "magic shield"
                    const Max = Bases[PointsE] + (Scaling[PointsE]*ThisChampion_AP)
                    const Tag = "Morgana magic shields the target friendly champion or herself for up to 5 seconds, absorbing magic damage."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //R
        if (ability === "3") {
            const Effects = 2
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 150, 225, 300]
                    const Scaling = [0, 0.7, 0.7, 0.7]
                    const Type = "magic damage"
                    const Max = Bases[PointsR] + (Scaling[PointsR]*ThisChampion_AP)
                    const Tag = "Morgana latches chains of energy onto nearby enemy champions, dealing magic damage."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                //Segundo efecto
                if (i === 2) {
                    const Bases = [0, 150, 225, 300]
                    const Scaling = [0, 0.7, 0.7, 0.7]
                    const Type = "magic damage"
                    const Max = Bases[PointsR] + (Scaling[PointsR]*ThisChampion_AP)
                    const Tag = "Targets who did not leave the tether range after 3 seconds are stunned for 1.5 seconds and dealt the same magic damage again."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        list_effects_all_abilities.push(list_effect_per_ability)
    }
    return list_effects_all_abilities
}

export { Morgana }
