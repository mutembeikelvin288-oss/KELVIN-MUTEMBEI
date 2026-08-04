import 'package:flutter_test/flutter_test.dart';
import 'package:genius/main.dart';

void main() {
  testWidgets('GENIUS app loads', (WidgetTester tester) async {
    await tester.pumpWidget(const GeniusApp());
    expect(find.text('GENIUS'), findsWidgets);
    expect(find.text('Learn. Practice. Master.'), findsOneWidget);
  });
}
