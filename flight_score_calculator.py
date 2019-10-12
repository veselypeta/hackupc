# Input : [("Barcelona-London", ( 145, 35, 0.228)), ...]
# Output : [("Barcelona-London", "score: ...") .. ]
times = []
costs = []
emissions = []
flightnames = []
flightscore = []
times_ordered = []
costs_ordered = []
emissions_ordered = []
values = []

score = []


def normaliser(triples):
    for flight in triples:
        times.append(flight[0])
        costs.append(flight[1])
        emissions.append(flight[2])
    timesf = [float(integral) for integral in times]
    costsf = [float(integral) for integral in costs]
    emissionsf = [float(integral) for integral in emissions]
    times_ordered = sorted(timesf)
    costs_ordered = sorted(costsf)
    emissions_ordered = sorted(emissionsf)
    
    for time in range(len(timesf)):
        timesf[time] = (timesf[time] - times_ordered[0]) / (times_ordered[-1] - times_ordered[0])
    for cost in range(len(costsf)):
        costsf[cost] = (costsf[cost] - costs_ordered[0]) / (costs_ordered[-1] - costs_ordered[0])
    for emission in range(len(emissionsf)):
        emissionsf[emission] = (emissionsf[emission] - emissions_ordered[0]) / (emissions_ordered[-1] - emissions_ordered[0])
    return zip(timesf, costsf, emissionsf)


def points(normed):
    for f in normed:
        flightscore.append((f[0] + 1.3 * f[1] + 1.5*f[2])*1000)
    return flightscore


def main(X):
    for trajet in X:
        values.append(trajet[1])
        flightnames.append(trajet[0])
    norm = normaliser(values)
    score = points(norm)
    print(zip(flightnames, score))


if __name__ == "__main__":
    main([("Barcelona-London", (145, 35, 0.228)), ("Barcelona-New York", (515, 197, 0.997)),
          ("Barcelona-Prague", (150, 51, 0.261)),
          ("London-Moscow", (225, 81, 0.445)), ("London-NewDelhi", (550, 314, 1.1)),
          ("London-Shanghai", (670, 489, 1.5)),
          ("NewYork-Toronto", (100, 103, 0.153)), ("NewYork-LosAngeles", (365, 107, 0.497)),
          ("NewYork-RiodeJaneiro", (540, 733, 1.3)),
          ("Prague-London", (125, 22, 0.217)), ("Prague-Moscow", (215, 100, 0.287)),
          ("Prague-Dubai", (370, 265, 0.735)),
          ("Tokyo-Sydney", (570, 466, 1.3)), ("Tokyo-Shanghai", (185, 317, 0.320)),
          ("Tokyo-NewDelhi", (560, 711, 0.958)),
          ("Moscow-Dubai", (315, 138, 0.432)), ("Moscow-NewDelhi", (360, 138, 0.720)),
          ("Moscow-Shanghai", (525, 215, 1.1)),
          ("NewDelhi-Sydney", (755, 412, 1.7)), ("NewDelhi-Shanghai", (355, 298, 0.666)),
          ("NewDelhi-Dubai", (215, 120, 0.395)),
          ("RiodeJaneiro-Sydney", (960, 588, 2.3)), ("RiodeJaneiro-LosAngeles", (600, 449, 1.7)),
          ("RiodeJaneiro-Dubai", (800, 861, 2.0)),
          ("Toronto-Shanghai", (855, 421, 1.7)), ("Toronto-LosAngeles", (321, 153, 780)),
          ("Toronto-Tokyo", (780, 757, 1.7)), ("Dubai-Sydney", (830, 1105, 2.0)),
          ("Dubai-NewDelhi", (200, 124, 0.193)), ("Dubai-Shanghai", (530, 289, 1.0)),
          ("Shanghai-Sydney", (635, 335, 1.3)),
          ("Shanghai-NewDelhi", (375, 391, 0.666)), ("Shanghai-Tokyo", (175, 320, 0.320)),
          ("LosAngeles-Sydney", (905, 507, 2.0)),
          ("LosAngeles-Toronto", (290, 205, 0.461)), ("LosAngeles-Tokyo", (690, 367, 1.4))])
