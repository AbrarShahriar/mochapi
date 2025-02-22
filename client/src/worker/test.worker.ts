const nums: number[] = [];

type WorkerMessage = {
  type: "GENERATE_DATA" | "ADD_FUNCTION";
};

self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  const { type } = event.data;

  console.log(type);

  switch (type) {
    case "GENERATE_DATA":
      nums.push(parseInt(Math.random().toPrecision(2)));
      console.log("GEN: ", nums);

      break;

    case "ADD_FUNCTION":
      nums.push(parseInt(Math.random().toPrecision(2)));
      console.log("ADD: ", nums);

      break;

    default:
      break;
  }

  console.log("OUTSIDE", nums);
};

// Clean up resources when worker is terminated
self.addEventListener("unload", () => {});
