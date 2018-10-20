const Annie = (list_effects_all_abilities, abilityData, PointsQ, PointsW, PointsE, PointsR, ThisChampion, ThisChampion_AP) => {
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
                    const Bases = [0, 80, 115, 150, 185, 220]
                    const Scaling = [0, 0.8, 0.8, 0.8, 0.8, 0.8]
                    const Type = "magic damage"
                    const Max = Bases[PointsQ] + (Scaling[PointsQ]*ThisChampion_AP)
                    const Tag = "Annie lanza un hechizo que realiza daño magico."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //W
        if (ability === "1") {
            const Effects = 1
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 70, 115, 160, 205, 250]
                    const Scaling = [0, 0.85, 0.85, 0.85, 0.85, 0.85]
                    const Type = "magic damage"
                    const Max = Bases[PointsW] + (Scaling[PointsW]*ThisChampion_AP)
                    const Tag = "Annie lanza un hechizo en cono que realiza daño magico."
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
                    const Bases = [0, 20, 30, 40, 50, 60]
                    const Scaling = [0, 0.2, 0.2, 0.2, 0.2, 0.2]
                    const Type = "magic damage"
                    const Max = Bases[PointsE] + (Scaling[PointsE]*ThisChampion_AP)
                    const Tag = "Enemigos que dañen a Annie con ataques basicos, reciben daño magico."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        //R
        if (ability === "3") {
            const Effects = 3
            for (let i = 1; i <= Effects; i++) {
                //Primer efecto
                if (i === 1) {
                    const Bases = [0, 150, 275, 400]
                    const Scaling = [0, 0.65, 0.65, 0.65]
                    const Type = "magic damage"
                    const Max = Bases[PointsR] + (Scaling[PointsR]*ThisChampion_AP)
                    const Tag = "Annie lanza a Tibbers y hace daño magico en area."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                //Segundo efecto
                if (i === 2) {
                    const Bases = [0, 10, 15, 20]
                    const Scaling = [0, 0.1, 0.1, 0.1]
                    const Type = "magic damage"
                    const Max = Bases[PointsR] + (Scaling[PointsR]*ThisChampion_AP)
                    const Tag = "Daño por segundo del aura."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
                //Tercer efecto
                if (i === 3) {
                    const Bases = [0, 50, 75, 100]
                    const Scaling = [0, 0.15, 0.15, 0.15]
                    const Type = "magic damage"
                    const Max = Bases[PointsR] + (Scaling[PointsR]*ThisChampion_AP)
                    const Tag = "Daño magico por básico."
                    const Obj = {Max: Max, Type: Type, Tag: Tag}
                    list_effect_per_ability.push(Obj)
                }
            }
        }
        list_effects_all_abilities.push(list_effect_per_ability)
    }
    return list_effects_all_abilities
}

export { Annie }