import 'package:flutter/material.dart';

import 'package:client/Common/http-request.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  void onClick() async {
    try {
      final response = await httpPostRequest(
        route: '/api/users/profile',
        body: {},
        successCode: 200,
      );
      print(response);
    } catch (e) {
      print(e);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          onClick();
        },
      ),
    );
  }
}
