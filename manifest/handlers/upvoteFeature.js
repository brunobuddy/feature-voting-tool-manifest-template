module.exports = async (req, res, manifest) => {
  const featureId = req.params.id;
  const feature = await manifest.from("features").findOneById(featureId);

  console.log("Feature ID:", featureId);
  console.log("Feature Data:", feature);

  if (!feature) {
    return res.status(404).json({ error: "Feature not found" });
  }

  await manifest.from("features").patch(featureId, {
    votes: feature.votes + 1,
  });

  res.status(200).json({
    message: "Feature upvoted successfully",
    feature: {
      ...feature,
      votes: feature.votes + 1,
    },
  });
};
