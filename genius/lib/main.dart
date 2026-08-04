import 'package:flutter/material.dart';

void main() {
  runApp(const GeniusApp());
}

class GeniusApp extends StatelessWidget {
  const GeniusApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GENIUS',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo),
        useMaterial3: true,
      ),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('GENIUS'),
        backgroundColor: Theme.of(context).colorScheme.primary,
        foregroundColor: Colors.white,
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                'Learn. Practice. Master.',
                style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 16),
              const Text(
                'Welcome to your cross-platform learning app for Grade 9 CBC/CBE practice.',
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 20),
              FilledButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.school),
                label: const Text('Start learning'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
