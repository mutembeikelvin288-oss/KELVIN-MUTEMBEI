class ResultModel {
  final String id;
  final String userId;
  final String quizId;
  final int score;
  final int total;

  const ResultModel({
    required this.id,
    required this.userId,
    required this.quizId,
    required this.score,
    required this.total,
  });
}
