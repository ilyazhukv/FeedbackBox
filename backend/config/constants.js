export const POST_TYPE = [
  { value: "complaint", label: "Complaint" },
  { value: "suggestion", label: "Suggestion" },
  { value: "feedback", label: "Feedback" }
]

export const POST_STATUS = [
  { value: "new", label: "New" },
  { value: "in-progress", label: "In progress" },
  { value: "resolved", label: "Resolved" }
]

export const createOrderMap = (constants) => {
  return constants.reduce((acc, item, index) => {
    acc[item.value] = index + 1;
    return acc;
  }, {});
};

export const groupByAndOrder = (field, orderMap) => [
  { $group: { _id: `$${field}`, count: { $sum: 1 } } },
  {
    $addFields: {
      order: {
        $switch: {
          branches: Object.entries(orderMap).map(([value, priority]) => ({
            case: { $eq: ["$_id", value] },
            then: priority,
          })),
          default: 99,
        },
      },
    },
  },
  { $sort: { order: 1 } },
];