import json

# Input : [("Barcelona-London", ( 145, 35, 0.228)), ...]
# Output : [("Barcelona-London", "score: ...") .. ]
times = []
costs = []
emissions = []

def normaliser(triples):
    for flight in triples:
        times.append(flight[0])
        costs.append(flight[1])
        emissions.append(flight[2])
    timesf = [float(i) for i in times]
    costsf = [float(i) for i in costs]
    emissionsf = [float(i) for i in emissions]
    times_ordered = timesf.copy()
    costs_ordered = costsf.copy()
    emissions_ordered = sorted(emissionsf)
    
    for time in range(len(timesf)):
        timesf[time] = (timesf[time] - min(times_ordered)) / (max(times_ordered) - min(times_ordered))
    for cost in range(len(costsf)):
        costsf[cost] = (costsf[cost] - min(costs_ordered)) / (max(costs_ordered) - min(costs_ordered))
    for emission in range(len(emissionsf)):
        emissionsf[emission] = (emissionsf[emission] - emissions_ordered[0]) / (emissions_ordered[-1] - emissions_ordered[0])
    return zip(timesf, costsf, emissionsf)


def calculate_score(normed):
    return [(time + 1.3*cost + 1.5*eco)*1000 for time,cost,eco in normed]


def main(cities):
    values = []
    for city in cities:
        for flight in city["flights"]:
            values.append(flight)
    normed = normaliser(values)
    for city in cities:
        score = calculate_score(normed)


if __name__ == "__main__":

    with open('complete_flights.json') as json_file:
        data = json.load(json_file)
    main(data)
